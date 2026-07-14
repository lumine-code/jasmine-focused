describe('jasmine-focused', () => {
  beforeAll(() => require('../lib/jasmine-focused'))

  afterEach(() => {
    jasmine.getEnv().focusPriority = null
  })

  it('installs each priority-based focus helper', () => {
    for (const helper of ['fdescribe', 'ffdescribe', 'fffdescribe', 'fit', 'ffit', 'fffit']) {
      expect(global[helper]).toEqual(jasmine.any(Function))
    }
  })

  it('filters specs below the active focus priority', () => {
    const env = jasmine.getEnv()
    env.focusPriority = 2

    expect(env.specFilter({focusPriority: 2})).toBeTrue()
    expect(env.specFilter({focusPriority: 1})).toBeFalse()
  })
})
