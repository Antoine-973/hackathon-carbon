export class CreateMissionDto {
  title: string;
  description: string;
  clientId: number;
  userId: number;
  startAt: Date;
  endAt: Date;
}
