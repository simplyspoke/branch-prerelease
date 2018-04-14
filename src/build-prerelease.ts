import * as getRepoInfo from 'git-repo-info';
import sync from 'cross-spawn';

/**
 * Provides the starting point of the harvest module
 */
export default class BranchPrerelease {
  info;
  branchType;
  storyName;

  constructor() {
    this.info = getRepoInfo();
  }

  getFeatureName() {
    const branchArray = this.info.branch.split('/');

    return {
      type: branchArray[0],
      story: branchArray[1]
    };
  }

  bump(type, story) {
    return sync('bump', ['--prerelease', '--preid', `${story}`], {
      stdio: 'inherit'
    });
  }

  publish() {
    const { type, story } = this.getFeatureName();
    const results = this.bump(type, story);
    console.log(type, story, results);
    console.log('\n\n\n');
    console.log('It Works!');
  }
}
