import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import { parseAsset } from './helpers'

describe('parseAsset', () => {
  it('parses asset with int amount', () => {
    const asset = '40 EOS'
    const expectedAsset = {
      amount: '40',
      symbol: 'EOS',
    }

    const parsedAsset = parseAsset(asset)
    expect(parsedAsset).toEqual(expectedAsset)
  })

  it('parses asset with float amount', () => {
    const asset = '40.123 EOS'
    const expectedAsset = {
      amount: '40.123',
      symbol: 'EOS',
    }

    const parsedAsset = parseAsset(asset)
    expect(parsedAsset).toEqual(expectedAsset)
  })

  it('throws on asset with missing amount', () => {
    const asset = ' EOS'
    expect(() => parseAsset(asset)).toThrow(RicardianContractRenderError)
  })

  it('throws on asset with missing symbol', () => {
    const asset = '40 '
    expect(() => parseAsset(asset)).toThrow(RicardianContractRenderError)
  })

  it('throws on empty string', () => {
    const asset = ''
    expect(() => parseAsset(asset)).toThrow(RicardianContractRenderError)
  })

  it('throws on asset decimal with no leading digit', () => {
    const asset = '.45 EOS'
    expect(() => parseAsset(asset)).toThrow(RicardianContractRenderError)
  })

  it('throws on lowercase symbol name', () => {
    const asset = '1.45 eos'
    expect(() => parseAsset(asset)).toThrow(RicardianContractRenderError)
  })
})
