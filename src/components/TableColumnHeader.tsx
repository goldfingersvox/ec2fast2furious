import { Table, Strong, IconButton } from '@radix-ui/themes'
import { CaretSortIcon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons'
import { styled } from '@stitches/react'
import { Ec2InstanceKeyType, columnFilterConfig } from '../api'
import { getQueryParams, setQueryParams } from '../utils'
import { columnHeaderMap } from '../configs'

interface Props {
  column: Ec2InstanceKeyType
}

const  TableColumnHeaderCell = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '1rem',
})


export function TableColumnHeader({column}: Props){
  const queryParams = getQueryParams();

  const isColumnSorted = queryParams?.sort.sortColumn === column;
  const sortDirection = queryParams?.sort.sortDirection;

  function getSortIcon(){
    if(!isColumnSorted){
      return CaretSortIcon
    }
 
    if(sortDirection === 'asc'){
      return CaretUpIcon
    }

    return CaretDownIcon
  }

  const SortIconComponent = getSortIcon()

  function onSortClick(){
    if(!isColumnSorted){
      setQueryParams({sort: {sortColumn: column, sortDirection: 'desc'}})
      return;
    }

    if(sortDirection === 'desc'){
      setQueryParams({sort: {sortColumn: column, sortDirection: 'asc'}})
      return;
    }

    setQueryParams({sort: {sortColumn: column, sortDirection: 'desc'}})
  }

  return (
    <Table.ColumnHeaderCell >
      <TableColumnHeaderCell>
        <Strong>{columnHeaderMap[column]}</Strong>
        {columnFilterConfig[column].sortable && <IconButton aria-label='sort' variant='ghost' onClick={onSortClick}><SortIconComponent/></IconButton>}
      </TableColumnHeaderCell>
    </Table.ColumnHeaderCell>
  )
}