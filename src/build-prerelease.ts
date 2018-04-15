import * as getRepoInfo from 'git-repo-info';
import * as sync from 'cross-spawn';
import chalk from 'chalk';

/**
 * Provides the starting point of the harvest module
 */
export class BranchPrerelease {
  info;

  constructor() {
    this.info = getRepoInfo();
  }

  run() {
    return this.getBranchName()
      .then(this.bump)
      .then(this.publish)
      .then(() => {
        console.log(chalk.green('Prerelease published to npm successfully!'));
      })
      .catch(error => {
        console.log(chalk.red(error));
      });
  }

  private getBranchName() {
    const branchArray = this.info.branch.split('/');

    return Promise.resolve({
      type: branchArray[0],
      name: branchArray[1]
    });
  }

  private bump({ type, name }) {
    return new Promise((resolve, reject) => {
      if (type !== 'feature') {
        reject('Must be on a feature branch!');
      }

      const command = 'bump';
      const args = ['--prerelease', '--preid', `${name}`];
      const options = {
        stdio: 'inherit'
      };

      sync(command, args, options);
      resolve();
    });
  }

  private publish() {
    return new Promise((resolve, reject) => {
      const command = 'npm';
      const args = ['publish'];
      const options = {
        stdio: 'inherit'
      };

      sync(command, args, options);
      resolve();
    });
  }
}
