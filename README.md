# Branch Prerelease

[![Build Status](https://travis-ci.org/simplyspoke/branch-prerelease.svg?branch=master)](https://travis-ci.org/simplyspoke/branch-prerelease)
[![Coverage Status](https://coveralls.io/repos/github/simplyspoke/branch-prerelease/badge.svg?branch=master)](https://coveralls.io/github/simplyspoke/branch-prerelease?branch=master)
[![npm version](https://badge.fury.io/js/harvest.svg)](http://badge.fury.io/js/harvest)
[![Greenkeeper badge](https://badges.greenkeeper.io/simplyspoke/branch-prerelease.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Quick npm prereleases to ease the multi-repo feature dependency woes.

# Install

`npm install branch-prerelease`

# Usage

## CLI

Its simple, run the following:

`branch-prerelease`

Branch Prerelease will detect the feature branch you are on, create a prerelease version, and publish it to npm. Quick and simple like your workflow should be.

## script

You can also include Branch Prerelease in a custom script:

```js
import BranchPrerelease from 'branch-prerelease';

const branchPrerelease = new BranchPrerelease();

branchPrerelease.run();
```
