import { Button, IconButton, Strong, Text, Select } from '@radix-ui/themes';
import { DoubleArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { styled } from '@stitches/react';
import { getQueryParams, setQueryParams } from "../utils";

interface Props {
  count: number;
}

const PaginationWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  gridArea: 'pagination'
})

const PaginationContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto min-content auto',
  gridTemplateAreas: '". pagination dropdown"'
})

const StyledIconButton = styled(IconButton, {
  height: '1.5rem',
  width: '1.5rem',
})

const StyledButton = styled(Button, {
  height: '1.5rem',
  width: '1.5rem',
})

const CurrentPage = styled(Text, {
  height: '1.5rem',
  width: '1.5rem',
  cursor: 'default'
})

const SelectWrapper = styled('div', {
  justifySelf: 'end',
  gridArea: 'dropdown'
})

export function Pagination({count}: Props){
  const params = getQueryParams();

  const pageParams = params && params.paging ? params.paging : {page:3, itemsPerPage: 10};

  const { page: currentPage, itemsPerPage: currentItemsPerPage } = pageParams;

  const lastPage = (count/currentItemsPerPage) - 1;
  const isCurrentPageFirst = currentPage === 0;
  const isCurrentPageLast = currentPage === lastPage; 

  function onFirstClick(){
    setQueryParams({paging: {...pageParams, ...{ page: 0 }}});
  }

  function onBackClick(){
    setQueryParams({paging: {...pageParams, ...{ page: currentPage - 1 }}});
  }

  function onPageClick(pageNumber: number){
    setQueryParams({paging: {...pageParams, ...{ page: pageNumber }}});
  }

  function onNextClick(){
    setQueryParams({paging: {...pageParams, ...{ page: currentPage + 1 }}});
  }

  function onLastClick(){
    setQueryParams({paging: {...pageParams, ...{ page: lastPage }}});
  }

  function generateNumberButtons(): number[]{

    if(lastPage === 0){
      return [currentPage]
    }

    if(isCurrentPageLast && lastPage > 2){
      return [currentPage - 2, currentPage - 1, currentPage]
    }

    if(isCurrentPageLast){
      return [currentPage - 1, currentPage]
    }

    if(isCurrentPageFirst && lastPage > 2){
      return [currentPage, currentPage + 1, currentPage + 2]
    }

    if(isCurrentPageFirst){
      return [currentPage, currentPage + 1]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }

  function onItemsPerPageChange(value: string) {
    const valueInt = parseInt(value)
    setQueryParams({paging: { page: 0, itemsPerPage: valueInt }})
  }


  return(
    <PaginationContainer>
      <PaginationWrapper>
        <StyledIconButton variant='ghost' onClick={onFirstClick}>
          <DoubleArrowLeftIcon/>
        </StyledIconButton>
        <StyledIconButton variant='ghost' onClick={onBackClick}>
          <ChevronLeftIcon/>
        </StyledIconButton>
        {generateNumberButtons().map((number) => (
          number === currentPage ?
          <CurrentPage style={{textAlign: 'center'}} key={number} color="purple" weight="bold" >{number+1}</CurrentPage> :
          <StyledButton key={number} disabled={number === currentPage} variant='ghost' onClick={() => onPageClick(number)}>
            {number === currentPage ? <Strong>{number+1}</Strong> : number + 1}
          </StyledButton> 
        ))}
        <StyledIconButton variant='ghost' onClick={onNextClick}>
          <ChevronRightIcon/>
        </StyledIconButton>
        <StyledIconButton variant='ghost' onClick={onLastClick}>
          <DoubleArrowRightIcon/>
        </StyledIconButton>
      </PaginationWrapper>
      <SelectWrapper>
        <Select.Root 
          defaultValue={params?.paging.itemsPerPage.toString() || "10"} 
          onValueChange={onItemsPerPageChange}
        >
          <Select.Trigger color="purple" variant="soft" />
          <Select.Content color="purple">
            <Select.Item value="10">10</Select.Item>
            {count && count > 24 && <Select.Item value="25">25</Select.Item>}
            {count && count > 49 && <Select.Item value="50">50</Select.Item>}
            {count && count > 74 && <Select.Item value="75">75</Select.Item>}
            {count && count > 99 && <Select.Item value="100">100</Select.Item>}
          </Select.Content>
        </Select.Root>
      </SelectWrapper>
    </PaginationContainer>
  )
}