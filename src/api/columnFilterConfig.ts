  import { ColumnFilterConfigType,  Ec2InstanceKeyType} from '../api/types'
  
  export const columnFilterConfig: ColumnFilterConfigType<Ec2InstanceKeyType> = {
    id: { filters:['equals', 'includes'], sortable: true},
    created_at: { filters: ['equals', 'includes', 'greater', 'lesser'], sortable: true },
    availability_zone: { filters:['equals', 'includes'], sortable: true},
    state: { filters:['equals', 'includes'], sortable: true},
    type: { filters:['equals', 'includes'], sortable: true},
    public_ip: { filters:['equals', 'includes'], sortable: true},
    private_ips: { filters:['equals', 'includes'], sortable: false},
  }
