---
title: "Improving verification performance with a great UI"
excerpt: ""
---
For better verification performance, it should be straightforward and easy for users to enter their phone numbers. To simplify this step and build a UI that accurately captures the correct input from the users, the Sinch SDK provides some utility APIs.

## As-You-Type-Formatting

The class `SINUITextFieldPhoneNumberFormatter` provides *"As-You-Type-Formatting"* on a UITextField. Example usage:
[block:code]
{
  "codes": [
    {
      "code": "UITextField* textField = ... // your text field\nNSString* defaultRegion = [SINDeviceregion currentCountryCode];\n\nSINUITextFieldPhoneNumberFormatter* formatter;\nformatter = [[SINUITextFieldPhoneNumberFormatter alloc] initWithCountryCode:defaultRegion];\nformatter.textField = textField;\ntextField.placeholder = [formatter exampleNumberWithFormat:SINPhoneNumberFormatNational];\nformatter.onTextFieldTextDidChange = ^(UITextField *textField) {\n  BOOL isViablePhoneNumber = [SINPhoneNumberUtil() isPossibleNumber:textField.text fromRegion:defaultRegion error:nil]\n    // Update UI based, e.g. color text field based on result\n};",
      "language": "objectivec"
    }
  ]
}
[/block]
Example how *As-You-Type-Formatting* can look for the user:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0f34ef0-aytf.gif",
        "aytf.gif",
        384,
        134,
        "#f8f6fa"
      ]
    }
  ]
}
[/block]
## Listing regions and country dialing codes

Example of populating a *UITableView* with a list of countries and their country calling code (in *Swift*):
[block:code]
{
  "codes": [
    {
      "code": "var regions: Array<SINRegionInfo> = [];\n\nlet regionList = PhoneNumberUtil().regionList(forLocale: NSLocale.currentLocale());\n\nregions = regionList.entries.sort({ (a: SINRegionInfo, b: SINRegionInfo) -> Bool in\n            return a.countryDisplayName < b.countryDisplayName;\n          })",
      "language": "swift"
    }
  ]
}
[/block]
Then as for the *UITableViewDataSource*:
[block:code]
{
  "codes": [
    {
      "code": "override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {\n        let cell = tableView.dequeueReusableCellWithIdentifier(...)\n\n        let region = regions[indexPath.row];\n\n        cell.textLabel?.text  = entry.countryDisplayName;\n        cell.detailTextLabel?.text = String(format:\"(+%@)\", entry.countryCallingCode);\n\n        return cell;\n}",
      "language": "swift"
    }
  ]
}
[/block]