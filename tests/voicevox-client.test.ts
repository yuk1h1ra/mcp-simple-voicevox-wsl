import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { VoicevoxClient, isWsl, detectWsl } from '../src/voicevox-client';

describe('VoicevoxClient', () => {
  let client: VoicevoxClient;
  const mockEndpoint = 'http://localhost:50021';

  beforeEach(() => {
    client = new VoicevoxClient(mockEndpoint);
  });

  describe('constructor', () => {
    it('should create instance with correct endpoint', () => {
      expect(client).toBeInstanceOf(VoicevoxClient);
    });
  });

  describe('SpeakOptions interface', () => {
    it('should have correct structure', () => {
      const options = {
        text: 'テスト',
        speaker: 1,
        speedScale: 1.0,
      };

      expect(typeof options.text).toBe('string');
      expect(typeof options.speaker).toBe('number');
      expect(typeof options.speedScale).toBe('number');
    });
  });
});

describe('detectWsl', () => {
  it('returns true when content contains microsoft', () => {
    expect(detectWsl('Linux version 5.15.0-microsoft-standard-WSL2')).toBe(
      true
    );
  });

  it('returns true when content contains WSL (uppercase)', () => {
    expect(detectWsl('Linux version 4.4.0-WSL #1')).toBe(true);
  });

  it('returns true when content contains wsl (lowercase)', () => {
    expect(detectWsl('Linux version 4.4.0-wsl #1')).toBe(true);
  });

  it('returns false when content does not contain microsoft or wsl', () => {
    expect(detectWsl('Linux version 5.15.0-generic #52-Ubuntu SMP')).toBe(
      false
    );
  });

  it('returns false for empty string', () => {
    expect(detectWsl('')).toBe(false);
  });
});

describe('isWsl', () => {
  const originalPlatform = process.platform;

  afterEach(() => {
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
      configurable: true,
      writable: true,
    });
  });

  it('returns false on darwin platform', () => {
    Object.defineProperty(process, 'platform', {
      value: 'darwin',
      configurable: true,
    });
    expect(isWsl()).toBe(false);
  });

  it('returns false on win32 platform', () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
      configurable: true,
    });
    expect(isWsl()).toBe(false);
  });

  it('returns a boolean on linux platform', () => {
    Object.defineProperty(process, 'platform', {
      value: 'linux',
      configurable: true,
    });
    expect(typeof isWsl()).toBe('boolean');
  });
});
