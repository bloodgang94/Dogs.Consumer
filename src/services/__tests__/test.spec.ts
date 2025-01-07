import { MatchersV3, PactV4 } from '@pact-foundation/pact'
import { beforeEach, describe, expect, it } from 'vitest'
import { DogService } from '../docservice'
import path from 'path'

const provider = new PactV4({
  consumer: 'frontend',
  provider: 'backend',
  dir: path.resolve(process.cwd(), 'pacts')
})

const dogExample = { breed: 'Corgi', age: 12 }
const EXPECTED_BODY = MatchersV3.eachLike(dogExample)

describe('Pact Consumer Test', () => {
  describe('when a call to the provider is made', () => {
    it('returns an HTTP 200 and a list of dogs', async () => {
      await provider
        .addInteraction()
        .given('I have a list of dogs')
        .uponReceiving('a request for all dogs with the builder pattern')
        .withRequest('GET', '/dogs', (builder) => {
          builder.query({ breed: 'Corgi' }), builder.headers({ Accept: 'application/json' })
        })
        .willRespondWith(200, (builder) => {
          builder.jsonBody(EXPECTED_BODY)
        })
        .executeTest(async (mockserver) => {
          const docservice = new DogService(mockserver.url)
          const res = await docservice.getDogs('Corgi')

          expect(res.data[0]).to.deep.eq(dogExample)
        })
    })

    it('returns an HTTP 400 and a list of dogs', async () => {
      await provider
        .addInteraction()
        .given('I not have a list of dogs')
        .uponReceiving('a request for all dogs with the builder pattern1')
        .withRequest('GET', '/dogs', (builder) => {
          builder.query({ breed: 'human' }), builder.headers({ Accept: 'application/json' })
        })
        .willRespondWith(404, (builder) => {
          builder.jsonBody({ error: 'not found!' })
        })
        .executeTest(async (mockserver) => {
          const docservice = new DogService(mockserver.url)
          const res = await docservice.getDogs('human')

          expect(res.status).toBe(404)
          expect(res.data).toEqual({ error: 'not found!' })
        })
    })
  })
})
