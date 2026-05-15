import { TestBed } from '@angular/core/testing';

import { AITS_GENESIS_VERSION, ANGULAR_VERSION } from './core';

describe('Core tokens', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should provide AITS_GENESIS_VERSION token', () => {
    const version = TestBed.inject(AITS_GENESIS_VERSION);
    expect(typeof version).toBe('string');
    expect(version.length).toBeGreaterThan(0);
  });

  it('should provide ANGULAR_VERSION token', () => {
    const version = TestBed.inject(ANGULAR_VERSION);
    expect(typeof version).toBe('string');
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
