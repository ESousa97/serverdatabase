// utils/api-error.js
// Classe de erro padronizada para a API

/**
 * Classe de erro customizada para respostas HTTP
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - Código de status HTTP
   * @param {string} message - Mensagem de erro
   * @param {Object} [details] - Detalhes adicionais do erro
   */
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Cria erro 400 Bad Request
   * @param {string} message - Mensagem de erro
   * @param {Object} [details] - Detalhes adicionais
   * @returns {ApiError}
   */
  static badRequest(message = 'Requisição inválida', details = null) {
    return new ApiError(400, message, details);
  }

  /**
   * Cria erro 401 Unauthorized
   * @param {string} message - Mensagem de erro
   * @returns {ApiError}
   */
  static unauthorized(message = 'Não autorizado') {
    return new ApiError(401, message);
  }

  /**
   * Cria erro 403 Forbidden
   * @param {string} message - Mensagem de erro
   * @returns {ApiError}
   */
  static forbidden(message = 'Acesso negado') {
    return new ApiError(403, message);
  }

  /**
   * Cria erro 404 Not Found
   * @param {string} resource - Nome do recurso não encontrado
   * @returns {ApiError}
   */
  static notFound(resource = 'Recurso') {
    return new ApiError(404, `${resource} não encontrado`);
  }

  /**
   * Cria erro 409 Conflict
   * @param {string} message - Mensagem de erro
   * @returns {ApiError}
   */
  static conflict(message = 'Conflito de dados') {
    return new ApiError(409, message);
  }

  /**
   * Cria erro 422 Unprocessable Entity
   * @param {string} message - Mensagem de erro
   * @param {Object} [details] - Detalhes de validação
   * @returns {ApiError}
   */
  static validation(message = 'Erro de validação', details = null) {
    return new ApiError(422, message, details);
  }

  /**
   * Cria erro 429 Too Many Requests
   * @param {string} message - Mensagem de erro
   * @returns {ApiError}
   */
  static tooManyRequests(message = 'Muitas requisições, tente novamente mais tarde') {
    return new ApiError(429, message);
  }

  /**
   * Cria erro 500 Internal Server Error
   * @param {string} message - Mensagem de erro
   * @returns {ApiError}
   */
  static internal(message = 'Erro interno do servidor') {
    return new ApiError(500, message);
  }

  /**
   * Converte o erro para formato JSON
   * @returns {Object}
   */
  toJSON() {
    return {
      error: this.message,
      statusCode: this.statusCode,
      ...(this.details && { details: this.details }),
      timestamp: new Date().toISOString(),
    };
  }
}

export default ApiError;
