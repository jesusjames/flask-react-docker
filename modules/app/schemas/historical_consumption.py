from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

historical_schema = {
    "type": "object",
    "properties": {
        "paciente": {
            "type": "string",
        },
        "edad": {
            "type": "integer",
            "maxLength": 3
        },
        "sexo": {
            "type": "string",
            "maxLength": 1
        },
        "procedimiento": {
            "type": "string",
            "minLength": 3
        },
        "producto": {
             "type": "string"
        },
        "cantidad": {
            "type": "integer"
        }
    },
    "required": ["paciente", "sexo", "procedimiento", "producto", "cantidad"],
    "additionalProperties": False
}


def validate_historical(data):
    try:
        validate(data, historical_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}