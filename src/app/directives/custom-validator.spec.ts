import { CustomValidator } from './custom-validator';

describe('CustomValidator', () => {
  it('should create an instance', () => {
    const directive = new CustomValidator();
    expect(directive).toBeTruthy();
  });
});
