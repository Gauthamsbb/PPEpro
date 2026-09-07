import os
from pathlib import Path
from typing import Annotated, Any, Optional
from pydantic import BaseModel, BeforeValidator, ConfigDict
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]


def _coerce_object_id(v: Any) -> str:
    return str(v)


PyObjectId = Annotated[str, BeforeValidator(_coerce_object_id)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: Optional[PyObjectId] = None

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc is None:
            return None
        doc = dict(doc)
        doc["id"] = str(doc.pop("_id"))
        return cls(**doc)

    def to_mongo(self) -> dict:
        data = self.model_dump(exclude={"id"}, exclude_none=False)
        return data
