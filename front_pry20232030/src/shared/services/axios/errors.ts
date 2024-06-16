type TypeWithKey<T> = {
  [key: string]: T;
};

export const getValidationError = (errorName: string) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: "Ocurrio un error de red",
    ROUTE_NOT_FOUND: "El endpoint no existe",
    BAD_CREDENTIALS: "Credenciales incorrectas",
    USER_NOT_VERIFIED: "Usuario no verificado",
    USER_NOT_ACTIVE: "Tu usuario fue bloqueado",
    USER_ALREADY_EXISTS: "Este email ya esta siendo utilizado",
    USER_NOT_FOUND: "Usuario no encontrado",
    INVALID_RESET_PASS_TOKEN: "Token de cambio de contraseña invalido",
    INVALID_TOKEN: "Token invalido",
    RESOURCE_ALREADY_EXISTS: "Este recurso ya existe",
  };

  return codeMatcher[errorName];
};
