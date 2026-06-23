import type { TopicData } from '../../types';
import module1Data from './module1Data';
import module2Data from './module2Data';
import module3Data from './module3Data';
import module4Data from './module4Data';
import module5Data from './module5Data';
import module6Data from './module6Data';
import module7Data from './module7Data';
import module8Data from './module8Data';
import module9Data from './module9Data';
import module10Data from './module10Data';
import module11Data from './module11Data';
import module12Data from './module12Data';
import module13Data from './module13Data';
import module14Data from './module14Data';
import module15Data from './module15Data';
import module16Data from './module16Data';
import module17Data from './module17Data';
import module18Data from './module18Data';
import module19Data from './module19Data';
import module20Data from './module20Data';

const allTopicData: Record<string, TopicData> = {
  ...module1Data,
  ...module2Data,
  ...module3Data,
  ...module4Data,
  ...module5Data,
  ...module6Data,
  ...module7Data,
  ...module8Data,
  ...module9Data,
  ...module10Data,
  ...module11Data,
  ...module12Data,
  ...module13Data,
  ...module14Data,
  ...module15Data,
  ...module16Data,
  ...module17Data,
  ...module18Data,
  ...module19Data,
  ...module20Data,
};

export function getTopicData(topicId: string): TopicData | undefined {
  return allTopicData[topicId];
}

export default allTopicData;
