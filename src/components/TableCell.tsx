import { Table, AccessibleIcon, HoverCard, Text, Badge } from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnFilterConfigType, Ec2InstanceKeyType } from "../api";

interface Props {
  isFirstColumn: boolean;
  column: keyof ColumnFilterConfigType<Ec2InstanceKeyType>;
  content: string;
}

const stateComponenteMap = {
  pending: <Badge color="yellow">Pending</Badge>, 
  running: <Badge color="green">Running</Badge>, 
  stopping: <Badge color="orange">Stopping</Badge>, 
  stopped: <Badge color="red">Stopped</Badge>, 
  'shutting-down': <Badge color="red">Shutting down</Badge>,
  terminated: <Badge color="gray">Terminated</Badge>, 
}



export function TableCell({isFirstColumn, column, content}: Props){

  const TableCellComponent = isFirstColumn ? Table.RowHeaderCell : Table.Cell

  if(column === 'private_ips'){
    return (
      <TableCellComponent>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Text>
              <AccessibleIcon label="see more"><DotsHorizontalIcon/></AccessibleIcon>
            </Text>
          </HoverCard.Trigger>
          <HoverCard.Content align="end">
            <Text>
              {content}
            </Text>
          </HoverCard.Content>
        </HoverCard.Root>
      </TableCellComponent>
    )
  }

  if(column === 'state'){
    return (
      <TableCellComponent>
        {stateComponenteMap[content as keyof typeof stateComponenteMap]}
      </TableCellComponent>
    )
  }


  return (
    <TableCellComponent>
      <Text>{content}</Text>
    </TableCellComponent>
  )

}