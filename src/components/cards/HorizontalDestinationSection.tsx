import { ScrollView } from "react-native";
import { DestinationCardData } from "../../types";
import { Card } from "../ui/Card";
import { SectionHeader } from "../ui/SectionHeader";
import { DestinationMiniCard } from "./DestinationMiniCard";

interface HorizontalDestinationSectionProps {
  title: string;
  items: DestinationCardData[];
  onMore?: () => void;
  onItemPress?: (item: DestinationCardData) => void;
  itemWidth?: number;
  imageHeight?: number;
}

export function HorizontalDestinationSection({
  title,
  items,
  onMore,
  onItemPress,
  itemWidth = 150,
  imageHeight
}: HorizontalDestinationSectionProps) {
  return (
    <Card style={{ paddingRight: 0 }}>
      <SectionHeader title={title} onAction={onMore} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => (
          <DestinationMiniCard
            key={item.id}
            item={item}
            width={itemWidth}
            imageHeight={imageHeight}
            onPress={onItemPress ? () => onItemPress(item) : undefined}
          />
        ))}
      </ScrollView>
    </Card>
  );
}
