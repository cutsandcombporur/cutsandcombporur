# Bugfix Requirements Document

## Introduction

The `FormValidator` in the DataEntryApp only checks that the `MobileNo` field is not empty or whitespace. It does not validate the format of the mobile number — any non-empty string (e.g., "abc", "12", "hello world") is accepted as a valid mobile number. This allows invalid data to be saved to the Google Sheet, undermining data integrity. The mobile number field should enforce a digits-only format with a valid length (exactly 10 digits).

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user enters a non-numeric string (e.g., "abcdef") as the mobile number THEN the system accepts it as valid and saves the entry

1.2 WHEN a user enters a string with fewer than 10 digits (e.g., "12345") as the mobile number THEN the system accepts it as valid and saves the entry

1.3 WHEN a user enters a string with more than 10 digits (e.g., "12345678901234") as the mobile number THEN the system accepts it as valid and saves the entry

1.4 WHEN a user enters a string mixing digits and non-digit characters (e.g., "12ab56cd90") as the mobile number THEN the system accepts it as valid and saves the entry

### Expected Behavior (Correct)

2.1 WHEN a user enters a non-numeric string as the mobile number THEN the system SHALL reject the entry with a validation error "Mobile No must be exactly 10 digits."

2.2 WHEN a user enters a string with fewer than 10 digits as the mobile number THEN the system SHALL reject the entry with a validation error "Mobile No must be exactly 10 digits."

2.3 WHEN a user enters a string with more than 10 digits as the mobile number THEN the system SHALL reject the entry with a validation error "Mobile No must be exactly 10 digits."

2.4 WHEN a user enters a string mixing digits and non-digit characters as the mobile number THEN the system SHALL reject the entry with a validation error "Mobile No must be exactly 10 digits."

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user enters exactly 10 digits as the mobile number (e.g., "9876543210") THEN the system SHALL CONTINUE TO accept the entry as valid

3.2 WHEN a user leaves the mobile number field empty or whitespace-only THEN the system SHALL CONTINUE TO reject the entry with the existing "Mobile No is required." error

3.3 WHEN all other fields (Name, StaffName, Amount, PaymentMethod) are valid THEN the system SHALL CONTINUE TO validate them using the existing rules without change

---

### Bug Condition (Formal)

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type EntryData
  OUTPUT: boolean

  // Returns true when MobileNo is non-empty but not exactly 10 digits
  RETURN NOT IsNullOrWhiteSpace(X.MobileNo)
     AND NOT Matches(X.MobileNo, "^\d{10}$")
END FUNCTION
```

### Fix Checking Property

```pascal
// Property: Fix Checking - Invalid mobile numbers are rejected
FOR ALL X WHERE isBugCondition(X) DO
  result ← FormValidator.Validate'(X)
  ASSERT result.IsValid = false
     AND result.Errors CONTAINS "Mobile No must be exactly 10 digits."
END FOR
```

### Preservation Checking Property

```pascal
// Property: Preservation Checking - Valid entries and other validations unchanged
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT FormValidator.Validate(X) = FormValidator.Validate'(X)
END FOR
```
