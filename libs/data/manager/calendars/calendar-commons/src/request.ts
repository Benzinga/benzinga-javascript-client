import { SafePromise } from '@benzinga/safe-await';
import { Subscribable } from '@benzinga/subscribable';
import { Session } from '@benzinga/session';
import { CommonCalendarErrorType, CommonCalendarEvent, CommonCalendarQueryParams } from './entities';
import { CommonCalendarRestful } from './restful';
import { CommonCalendarEnvironmentProps } from './environment';
export interface CommonCalendarRequestOptions {
  overrideUrl?: string;
  responseIsEntitiesList?: boolean;
}
export class CommonCalendarRequest<T extends string, E> extends Subscribable<CommonCalendarEvent<T, E>> {
  private restful: CommonCalendarRestful;
  private calendarTypeName: string;

  constructor(session: Session, env: CommonCalendarEnvironmentProps, calendarTypeName: string) {
    super();
    this.restful = new CommonCalendarRestful(session, env);
    this.calendarTypeName = calendarTypeName;
  }

  public fetchCalendarData = async (
    params: CommonCalendarQueryParams,
    additionalParams: object = {},
    options: CommonCalendarRequestOptions = {},
  ): SafePromise<E[]> => {
    const calendarDataResponse = await this.restful.fetchCalendarData<E>(
      this.calendarTypeName,
      params,
      additionalParams,
      options,
    );

    if (calendarDataResponse.err) {
      this.call({
        error: calendarDataResponse.err,
        errorType: CommonCalendarErrorType.GET_DATA,
        parameters: params,
        type: `${this.calendarTypeName as T}:error`,
      });

      return { err: calendarDataResponse.err };
    } else {
      const result = options.responseIsEntitiesList
        ? calendarDataResponse.result
        : calendarDataResponse?.result?.[this.calendarTypeName] || [];

      this.call({
        result,
        type: `${this.calendarTypeName as T}:fetched_data`,
      });

      return { result };
    }
  };
}
