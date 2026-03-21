export interface FamilyMember {
  id: number;
  username: string;
  email: string;
}

export interface Family {
  id: number;
  name: string;
  members: FamilyMember[];
}

export interface Invitation {
  id: number;
  family_id: number;
  sender_id: number;
  recipient_id: number;
  family_name: string;
  sender_username: string;
}