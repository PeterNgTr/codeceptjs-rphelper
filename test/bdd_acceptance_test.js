const { exec } = require("child_process");
const { expect } = require('chai');
const runner = './node_modules/.bin/codeceptjs run features/basic.feature'
const configFilePath = './test/codecept.conf.js'

describe('RP Plugin - Codeceptjs Integration - BDD Feature', () => {

    describe('Passed test', () => {
        it('should push data to rp', (done) => {
            exec(`${runner} --grep @pass -c ${configFilePath} --verbose`, (error, stdout, stderr) => {
                expect(stderr).to.be.empty;
                expect(stdout).to.include('The launchId is started.');
                expect(stdout).to.include('The suiteId is started.');
                expect(stdout).to.include('The testId is started.');
                expect(stdout).to.include('The stepId is started.');
                expect(stdout).to.include('The success stepId is updated.');
                expect(stdout).to.include('OK  | 1 passed ');
                done();
            });
        });

    });

    describe('Failed test', () => {
        it('should push data to rp', (done) => {
            exec(`${runner} --grep @fail -c ${configFilePath} --verbose`, (error, stdout, stderr) => {
                expect(stderr).to.be.empty;
                expect(stdout).to.include('The launchId is started.');
                expect(stdout).to.include('The launchId is started.');
                expect(stdout).to.include('The suiteId is started.');
                expect(stdout).to.include('The testId is started.');
                expect(stdout).to.include('The stepId is started.');
                expect(stdout).to.include('The failed stepId is updated.');
                expect(stdout).to.include('Screenshot is attached to failed step');
                expect(stdout).to.include('FAIL  | 0 passed, 1 failed');
                done();
            });
        });
    });

});

