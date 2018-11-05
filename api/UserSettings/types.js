export default `
  enum AllowedSettingType {
    boolean
    string
    number
  }

  input UserSettingInput {
    _id: String
    isGDPR: Boolean
    key: String
    label: String
    type: String
    value: String
    lastUpdatedByUser: String
  }

  type UserSetting {
    _id: String
    isGDPR: Boolean
    key: String # What is the key value you'll access this setting with?
    label: String # The user-facing label for the setting.
    type: AllowedSettingType
    value: String
    lastUpdatedByUser: String
  }

  type GDPRComplete {
    complete: Boolean
  }
`;
