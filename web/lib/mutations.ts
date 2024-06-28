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
        idvId: ""
        idvStatus: ""
      }
    ) {
      _id
      fullName
      userName
      email
      wallet
      currencyPreference
      profileImg
      idvId
      idvStatus
    }
  }
`;

export const UPDATE_USER_IDV = gql`
  mutation($idvStatus: String!, $idvId: String!) {
    updateOneUser(
      query: { idvId: $idvId }
      set: { idvStatus: $idvStatus}
    ) {
      _id
      wallet
      idvStatus
    }
  }
`;

export const UPDATE_USER_IDV_ID = gql`
  mutation($wallet: String! $idvId: String!) {
    updateOneUser(
      query: { wallet: $wallet }
      set: { idvId: $idvId}
    ) {
      _id
      wallet
      idvId
    }
  }
`;
