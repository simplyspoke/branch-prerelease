jest.mock('cross-spawn');
import BranchPrerelease from './build-prerelease';
import * as sync from 'cross-spawn';

describe('Build Prerelease', () => {
  let instance;

  beforeEach(() => {
    instance = new BranchPrerelease();
  });

  it('BranchPrerelease is instantiable', () => {
    expect(instance).toBeInstanceOf(BranchPrerelease);
  });

  describe('run method', () => {
    beforeEach(() => {
      instance.getBranchName = jest.fn(() => Promise.resolve());
      instance.bump = jest.fn(() => Promise.resolve());
      instance.publish = jest.fn(() => Promise.resolve());
    });

    it('should return the branch type and name.', async () => {
      await instance.run().then(() => {
        expect(instance.getBranchName).toHaveBeenCalled();
        expect(instance.bump).toHaveBeenCalled();
        expect(instance.publish).toHaveBeenCalled();
      });
    });

    it('should return an undefined name on the devlop branch.', async () => {
      instance.bump = jest.fn(() => Promise.reject('Failed'));
      await instance.run().catch(error => {
        expect(error).toEqual('Failed');
      });
    });
  });

  describe('getBranchName method', () => {
    beforeEach(() => {
      expect.assertions(1);
    });

    it('should return the branch type and name.', () => {
      instance.info = {
        branch: 'feature/story'
      };
      return expect(instance.getBranchName()).resolves.toEqual({
        type: 'feature',
        name: 'story'
      });
    });

    it('should return an undefined name on the devlop branch.', () => {
      instance.info = {
        branch: 'develop'
      };
      return expect(instance.getBranchName()).resolves.toEqual({
        type: 'develop',
        name: undefined
      });
    });
  });

  describe('bump method', () => {
    it('should bump the prerelease with the branch name using cross-spawn.', async () => {
      const params = {
        type: 'feature',
        name: 'name'
      };
      await instance.bump(params).then(() => {
        expect(sync).toHaveBeenCalledWith(
          'bump',
          ['--prerelease', '--preid', 'name'],
          {
            stdio: 'inherit'
          }
        );
      });
    });

    it('should reject when it is not on a feature branch', async () => {
      expect.assertions(1);
      const params = {
        type: 'develop'
      };
      await expect(instance.bump(params)).rejects.toMatch(
        'Must be on a feature branch!'
      );
    });
  });

  describe('publish method', () => {
    it('should publish the npm module using cross-spawn.', async () => {
      await instance.publish().then(() => {
        expect(sync).toHaveBeenCalledWith('npm', ['publish'], {
          stdio: 'inherit'
        });
      });
    });
  });
});
