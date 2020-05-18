export interface IMapper<TDomain,TDto> {
    toDomain (dto: TDto): TDomain;
    toDTO (t: TDomain): any;
  }