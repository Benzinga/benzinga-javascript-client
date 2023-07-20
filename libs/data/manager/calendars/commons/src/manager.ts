import { Subscribable } from '@benzinga/subscribable';
import { Session } from '@benzinga/session';
import { CommonCalendarEvent, CommonCalendarQueryParams } from './entities';
import { CommonCalendarRequest } from './request';
import { SafePromise } from '@benzinga/safe-await';
import { CommonCalendarRequestOptions } from './internalEntities';
import { CommonCalendarEnvironmentProps } from './environment';

export class CommonCalendarManager<CalendarType extends string, Entity> extends Subscribable<
  CommonCalendarEvent<CalendarType, Entity>
> {
  protected session: Session;
  protected request: CommonCalendarRequest<CalendarType, Entity>;
  protected calendarTypeName: string;

  constructor(
    session: Session,
    environment: CommonCalendarEnvironmentProps,
    calendarTypeName: CalendarType,
    options: CommonCalendarRequestOptions<Entity> = {},
  ) {
    super();
    this.session = session;
    this.calendarTypeName = calendarTypeName;
    this.request = new CommonCalendarRequest<CalendarType, Entity>(session, environment, calendarTypeName, options);
  }

  public fetchCalendarData = async (params: CommonCalendarQueryParams | object): SafePromise<Entity[]> =>
    this.request.fetchCalendarData(params);
}
