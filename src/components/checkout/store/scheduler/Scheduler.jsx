import {
  Top,
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
} from '../storeStyle';

function Scheduler() {
  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-time-line" />
            <ItemText>Schedule</ItemText>
          </ItemPod>

          <Icon className="ri-arrow-down-s-line" />
        </Top>
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Scheduler;
