export default `
  enum ListType {
    global
    contract
    all # Both global and contract-specific whitelists
  }

  enum StreamerType {
    whitelist
    blacklist
    everyone
  }

  enum AssetType {
    video
    image
  }

  type ContractAsset {
    type: AssetType
    url: String
    minCoverage: Float
    maxCoverage: Float
  }

  type Contract {
    owner: String
    title: String
    startDate: String
    endDate: String
    asset: ContractAsset
    # TODO: Figure out if we should nest the streamerType and list type under this.
    streamersAllowed: StreamerType
    whitelistType: ListType
    blacklistType: ListType
    whitelist: [String]
    blacklist: [String]
  }
`;
