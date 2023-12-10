import { Ec2InstanceKeyType } from "../api"

export const columnHeaderMap: Record<Ec2InstanceKeyType, string> = {
  id: 'Id',
  created_at: 'Created at',
  availability_zone: 'Availability zones',
  state: 'State',
  type: 'Type',
  public_ip: 'Public ip',
  private_ips: 'Private ips'
}
