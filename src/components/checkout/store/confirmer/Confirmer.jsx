import {
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  Top,
} from '../storeStyle';

function Confirmer() {
  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-checkbox-circle-line" />
            <ItemText>Confirm Order</ItemText>
          </ItemPod>

          <Icon className="ri-arrow-down-s-line" />
        </Top>
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Confirmer;
