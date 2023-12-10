import { Table, Card } from '@radix-ui/themes'
import { Ec2InstanceKeyType, columnFilterConfig } from '../api'
import { useFetchEc2Instances } from "../hooks"
import { Heading, Pagination, TableColumnHeader, TableCell } from "../components";

export function Ec2Table(){

  const { data, error, isLoading } = useFetchEc2Instances();

  if(error){
    <Heading level={1}>{error.message}</Heading>
  }

  if(!data){
    return null
  }

  const { count, data: ec2Instances } = data;

  const columns = Object.keys(columnFilterConfig) as Ec2InstanceKeyType[];

  return (
    <Card asChild>
      <main>
        {count && count > 9 && <Pagination count={count || 0}/>}
        <Table.Root style={{marginBottom: '1rem'}}> 
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <TableColumnHeader key={column} column={column}/>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
            isLoading
              ? <Heading level={1}>Loading</Heading>
              : ec2Instances.map((instance) => (
              <Table.Row key={instance.id}>
                {columns.map((column) => (
                  <TableCell key={column} column={column} isFirstColumn={column === columns[0]} content={instance[column]?.toString() || ''}/>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        {count && count > 9 && <Pagination count={count || 0}/>}
      </main>
    </Card>
  )

}
