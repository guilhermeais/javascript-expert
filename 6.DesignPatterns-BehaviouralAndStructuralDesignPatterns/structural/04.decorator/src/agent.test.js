import { expect, describe, jest, test, beforeEach } from '@jest/globals'
import { injectHttpInterceptor } from './agent'
import { Server } from 'http'

const originalHttp = jest.createMockFromModule('http')
describe('HTTP interceptor Agent', () => {
  const EVENT_REQUEST = 'request'
  const request = null
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })
  test('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }
    const serverInstance = new originalHttp.Server()
    serverInstance.emit(EVENT_REQUEST, request, response)
    expect(response.setHeader).not.toHaveBeenCalled()
  })
  test('should active header interceptor', () => {
    injectHttpInterceptor()
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }
    const serverInstance = new Server()
    serverInstance.emit(EVENT_REQUEST, request, response)
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Guilherme Teixeira')
  })
});