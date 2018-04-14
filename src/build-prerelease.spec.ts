import BranchPrerelease from './build-prerelease';

describe('Build Prerelease', () => {
  let instance;

  beforeEach(() => {
    instance = new BranchPrerelease();
  });

  it('BranchPrerelease is instantiable', () => {
    expect(instance).toBeInstanceOf(BranchPrerelease);
  });

  describe('getFeatureName Method', () => {
    beforeEach(() => {
      instance.info = {
        branch: 'feature/story'
      };
    });

    it('BranchPrerelease is instantiable', () => {
      const { type, story } = instance.getFeatureName();
      expect(type).toEqual('feature');
      expect(story).toEqual('story');
    });
  });
});
