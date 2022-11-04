import { Subscribable } from '@benzinga/subscribable';
import { Session } from '@benzinga/session';
import { CommonCalendarEvent } from './entities';
import { CommonCalendarRequest } from './request';

export class CommonCalendarManager<CalendarType extends string, Entity> extends Subscribable<
  CommonCalendarEvent<CalendarType, Entity>
> {
  protected session: Session;
  protected request: CommonCalendarRequest<CalendarType, Entity>;

  protected calendarTypeName: string;

  constructor(session: Session, environment: any, calendarTypeName: CalendarType) {
    super();
    this.session = session;
    this.calendarTypeName = calendarTypeName;
    this.request = new CommonCalendarRequest<CalendarType, Entity>(session, environment, calendarTypeName);
  }
}
