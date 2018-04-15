#!/usr/bin/env node
'use strict';

const { BranchPrerelease } = require('../dist');

const branchPrerelease = new BranchPrerelease();

branchPrerelease.run();
