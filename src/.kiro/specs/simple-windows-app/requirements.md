# Requirements Document

## Introduction

A simple standalone Windows desktop application built with C#/WinForms. The app provides a data entry form for capturing customer payment information and saving it directly to a Google Sheet. This is a standalone project, separate from the existing web application in the workspace.

## Glossary

- **Data_Entry_App**: The C#/WinForms desktop application for capturing payment data
- **Entry_Form**: The main form containing input fields for customer payment information
- **Google_Sheet**: The remote Google Sheets spreadsheet where submitted data is stored
- **Payment_Method**: The method of payment selected from a predefined list (Gpay, Debit Card, Credit Card)

## Requirements

### Requirement 1: Display Data Entry Form

**User Story:** As a user, I want a simple form with fields for customer payment details, so that I can quickly enter data.

#### Acceptance Criteria

1. THE Data_Entry_App SHALL display an Entry_Form containing a text input field labeled "Name"
2. THE Data_Entry_App SHALL display an Entry_Form containing a text input field labeled "Mobile No"
3. THE Data_Entry_App SHALL display an Entry_Form containing a text input field labeled "Staff Name"
4. THE Data_Entry_App SHALL display an Entry_Form containing a numeric input field labeled "Amount"
5. THE Data_Entry_App SHALL display an Entry_Form containing a dropdown labeled "Payment Method" with the options: Gpay, Debit Card, Credit Card
6. THE Data_Entry_App SHALL display a "Save" button on the Entry_Form

### Requirement 2: Validate Form Input

**User Story:** As a user, I want the form to validate my input before saving, so that incomplete or invalid data is not submitted.

#### Acceptance Criteria

1. WHEN a user clicks "Save" with the Name field empty, THE Data_Entry_App SHALL display a validation error and prevent submission
2. WHEN a user clicks "Save" with the Mobile No field empty, THE Data_Entry_App SHALL display a validation error and prevent submission
3. WHEN a user clicks "Save" with the Staff Name field empty, THE Data_Entry_App SHALL display a validation error and prevent submission
4. WHEN a user clicks "Save" with the Amount field empty or set to zero, THE Data_Entry_App SHALL display a validation error and prevent submission
5. WHEN a user clicks "Save" with no Payment_Method selected, THE Data_Entry_App SHALL display a validation error and prevent submission

### Requirement 3: Save Data to Google Sheet

**User Story:** As a user, I want the form data to be saved to a Google Sheet when I click Save, so that all entries are stored centrally.

#### Acceptance Criteria

1. WHEN a user clicks "Save" and all fields are valid, THE Data_Entry_App SHALL append a new row to the Google_Sheet containing Name, Mobile No, Staff Name, Amount, and Payment_Method
2. WHEN the data is saved successfully, THE Data_Entry_App SHALL display a success confirmation message
3. WHEN the data is saved successfully, THE Data_Entry_App SHALL clear all input fields on the Entry_Form
4. IF the Google_Sheet is unreachable or the save fails, THEN THE Data_Entry_App SHALL display an error message describing the failure

### Requirement 4: Edit Saved Data

**User Story:** As a user, I want to view and edit previously saved entries from the Google Sheet, so that I can correct mistakes in the submitted data.

#### Acceptance Criteria

1. THE Data_Entry_App SHALL provide an "Edit" button on the Entry_Form that opens a list of previously saved entries from the Google_Sheet
2. WHEN the user clicks "Edit", THE Data_Entry_App SHALL retrieve all existing rows from the Google_Sheet and display them in a searchable list view
3. WHEN the user selects an entry from the list, THE Data_Entry_App SHALL populate the Entry_Form fields with the selected entry's Name, Mobile No, Staff Name, Amount, and Payment_Method values
4. WHEN the user modifies the populated fields and clicks "Save", THE Data_Entry_App SHALL update the corresponding row in the Google_Sheet with the corrected values
5. WHEN the entry is updated successfully, THE Data_Entry_App SHALL display a success confirmation message and clear all input fields on the Entry_Form
6. IF the Google_Sheet is unreachable or the update fails, THEN THE Data_Entry_App SHALL display an error message describing the failure
