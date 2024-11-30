import React, { useState } from 'react';

const PasswordGenerator: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');

  const generatePassword = (): string => {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let characters = '';
    if (includeUppercase) characters += upperCaseLetters;
    if (includeLowercase) characters += lowerCaseLetters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    return generatedPassword;
  };

  const handleGeneratePassword = () => {
    setPassword(generatePassword());
    setCopySuccess('');
  };

  const handleCopyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        setCopySuccess('✔ Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      });
    }
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <div className="password-length">
        <label>Length: {passwordLength}</label>
        <input
          type="range"
          min="8"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Number(e.target.value))}
        />
      </div>
      <div className="options">
        <div>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label>Include Uppercase</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <label>Include Lowercase</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label>Include Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label>Include Symbols</label>
        </div>
      </div>
      <div>
        <button className="generate-btn" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
      {password && (
        <div className="password-display">
          <h3>Your Password:</h3>
          <div className="password-inline">
            <p className="password">{password}</p>
            <button className="copy-btn" onClick={handleCopyToClipboard}>
              Copy
            </button>
          </div>
          {copySuccess && <span className="copy-success">{copySuccess}</span>}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
