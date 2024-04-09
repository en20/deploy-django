import functools
from pydantic import ValidationError


def validate_request(*, key, schemas):
    def decorator(function):
        @functools.wraps(function)
        def wrapper(*args, **kargs):
            for schema in schemas:
                try:
                    schema(**kargs[key])
                    return function(*args, **kargs)

                except ValidationError:
                    print(f"Failed to parse: {schema.__name__}")
                    continue

            return 400, {"error": "Unknown schema provided"}
        return wrapper
    return decorator
