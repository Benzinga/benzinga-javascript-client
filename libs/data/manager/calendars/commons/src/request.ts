import { SafePromise } from '@benzinga/safe-await';
import { Subscribable } from '@benzinga/subscribable';
import { Session } from '@benzinga/session';
import { CommonCalendarErrorType, CommonCalendarEvent, CommonCalendarQueryParams } from './entities';
import { CommonCalendarRestful } from './restful';
import { CommonCalendarEnvironmentProps } from './environment';
import { CommonCalendarRequestOptions } from './internalEntities';

export class CommonCalendarRequest<T extends string, E> extends Subscribable<CommonCalendarEvent<T, E>> {
  private restful: CommonCalendarRestful;
  private calendarTypeName: string;
  private options: CommonCalendarRequestOptions<E>;

  constructor(
    session: Session,
    env: CommonCalendarEnvironmentProps,
    calendarTypeName: string,
    options: CommonCalendarRequestOptions<E> = {},
  ) {
    super();
    this.options = options;
    this.restful = new CommonCalendarRestful(session, env);
    this.calendarTypeName = calendarTypeName;
  }

  public fetchCalendarData = async (params: CommonCalendarQueryParams): SafePromise<E[]> => {
    const calendarDataResponse = await this.restful.fetchCalendarData<E>(params, this.options);

    if (calendarDataResponse.err) {
      this.dispatch({
        error: calendarDataResponse.err,
        errorType: CommonCalendarErrorType.GET_DATA,
        parameters: params,
        type: `${this.calendarTypeName as T}:error`,
      });

      return { err: calendarDataResponse.err };
    } else {
      // const result = this.options.responseIsEntitiesList
      //   ? calendarDataResponse.ok
      //   : calendarDataResponse?.ok?.[this.options.responseCalenderName ?? this.calendarTypeName] || [];

      // const camelCaseResults = this.options.camelCaseResult ? camelCaseKeys<E[]>(result) : result;

      const result = this.options.formatResponse
        ? this.options.formatResponse(calendarDataResponse.ok)
        : calendarDataResponse?.ok?.[this.calendarTypeName] || [];

      this.dispatch({
        result,
        type: `${this.calendarTypeName as T}:fetched_data`,
      });

      return { ok: result };
    }
  };
}
