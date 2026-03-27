# Tasks: Simple Windows Data Entry App

## Task 1: Project Setup
- [x] 1.1 Create a new C# WinForms project (`DataEntryApp/`) with .NET 6+ and a solution file
- [x] 1.2 Add NuGet packages: `Google.Apis.Sheets.v4`, `FsCheck`, `FsCheck.Xunit`, `xunit`, `xunit.runner.visualstudio`
- [x] 1.3 Create project folder structure: `Models/`, `Services/`, `Validators/`

## Task 2: Data Models
- [x] 2.1 Create `EntryData` class with properties: Name, MobileNo, StaffName, Amount (decimal), PaymentMethod
- [x] 2.2 Create `ValidationResult` class with IsValid (bool) and Errors (List<string>)
- [x] 2.3 Define `AllowedPaymentMethods` constant array: "Gpay", "Debit Card", "Credit Card"

## Task 3: Form Validator
- [x] 3.1 Create `FormValidator` static class with `Validate(EntryData)` method
- [x] 3.2 Implement validation rules: Name not empty/whitespace, MobileNo not empty/whitespace, StaffName not empty/whitespace, Amount > 0, PaymentMethod in allowed list
- [x] 3.3 Return `ValidationResult` with all applicable error messages

## Task 4: Google Sheet Service
- [x] 4.1 Create `GoogleSheetService` class with constructor accepting credential path, spreadsheet ID, and sheet name
- [x] 4.2 Implement `AppendRowAsync(EntryData)` to append a row to the Google Sheet
- [x] 4.3 Implement `GetAllRowsAsync()` to retrieve all rows as `List<EntryData>`
- [x] 4.4 Implement `UpdateRowAsync(int rowIndex, EntryData)` to update a specific row

## Task 5: Main Form UI
- [x] 5.1 Design `MainForm` with TextBoxes for Name, MobileNo, StaffName, Amount; ComboBox for PaymentMethod; Save and Edit buttons
- [x] 5.2 Implement Save button click: validate input, call AppendRowAsync or UpdateRowAsync based on mode, show success/error message, clear form on success
- [x] 5.3 Implement Edit button click: open `EditListForm`, populate fields on selection, switch to edit mode
- [x] 5.4 Implement form clearing logic and edit mode tracking (isEditMode, editRowIndex)

## Task 6: Edit List Form
- [x] 6.1 Design `EditListForm` as a modal dialog with DataGridView, search TextBox, Select and Cancel buttons
- [x] 6.2 Implement loading all rows from Google Sheet on form open
- [x] 6.3 Implement search/filter functionality on the DataGridView by Name or MobileNo
- [x] 6.4 Implement row selection to return selected EntryData and row index to MainForm

## Task 7: Unit Tests
- [x] 7.1 Write unit tests verifying all form controls exist on MainForm (Requirements 1.1–1.6)
- [x] 7.2 Write unit tests for ComboBox containing exactly the three payment methods
- [x] 7.3 Write unit tests for error handling: API failure shows error message (Requirements 3.4, 4.6)

## Task 8: Property-Based Tests
- [x] 8.1 Write FsCheck property test: invalid entries are rejected by validation (Property 1)
- [x] 8.2 Write FsCheck property test: valid entries pass validation (Property 2)
- [x] 8.3 Write FsCheck property test: append round-trip with mock service (Property 3)
- [x] 8.4 Write FsCheck property test: update round-trip with mock service (Property 4)
- [x] 8.5 Write FsCheck property test: form cleared after successful save (Property 5)
- [x] 8.6 Write FsCheck property test: search filter returns only matching entries (Property 6)
- [x] 8.7 Write FsCheck property test: form population matches selected entry (Property 7)
