import { gql } from "@apollo/client";

// query($associatedId: String!) {
//     listings(query: { associatedId: $associatedId}) {
//         _id
//         assetDetails
//         associatedId
//         earningPotential
//         earningPotentialDuration
//         expectedNetReturn
//         images
//         marketValue
//         pastReturns
//     }
// }
// `;

export const ADD_LISTING = gql`
  mutation(
    $assetDetails: String!
    $associatedId: String!
    $earningPotential: String!
    $earningPotentialDuration: String!
    $expectedNetReturn: String!
    $images: [String!]!
    $marketValue: String!
    $pastReturns: String!
  ) {
    insertOneListing(
      data: {
        assetDetails: $assetDetails
        associatedId: $associatedId
        earningPotential: $earningPotential
        earningPotentialDuration: $earningPotentialDuration
        expectedNetReturn: $expectedNetReturn
        images: $images
        marketValue: $marketValue
        pastReturns: $pastReturns
      }
    ) {
      _id
      assetDetails
      associatedId
      earningPotential
      earningPotentialDuration
      expectedNetReturn
      images
      marketValue
      pastReturns
    }
  }
`;

export const ADD_USER = gql`
  mutation(
    $fullName: String!
    $userName: String!
    $email: String!
    $wallet: String!
    $currencyPreference: String!
    $profileImg: String!
  ) {
    insertOneUser(
      data: {
        fullName: $fullName
        userName: $userName
        email: $email
        wallet: $wallet
        currencyPreference: $currencyPreference
        profileImg: $profileImg
      }
    ) {
      _id
      fullName
      userName
      email
      wallet
      currencyPreference
      profileImg
    }
  }
`;