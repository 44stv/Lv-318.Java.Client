import { Transit } from './transit.model';

export interface Paginator {
  content:          Transit[];
  pageable:         PageableClass;
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
}

export interface PageableClass {
  sort:       Sort;
  offset:     number;
  pageSize:   number;
  pageNumber: number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
}

