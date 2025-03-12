import { useRouter } from "expo-router";
import { View, Text, Image, Button, StyleSheet, Pressable } from "react-native";

interface ActivityBoxProps {
    title: string;
    id: string;
}

const styles = StyleSheet.create({
    card: {
      padding: 20,
      backgroundColor: '#F6FAEC',
      borderColor: '#D9EBB2',
      borderWidth: 1,
      borderRadius: 10,
      marginHorizontal: 5,
      width: '48%',
      height: 139,
      position: 'relative',
    },
    points: {
        position: 'absolute',
        backgroundColor: '#FFD631',
        borderRadius: 20,
        padding: 5,
        right: 10,
        top: -10
    },
    pointText: {
        fontSize: 11
    }
});
const ActivityBox: React.FC<ActivityBoxProps> = ({title, id}) => {
    const router = useRouter();
    return (
            <Pressable style={styles.card} onPress={() => router.push(`../pages/${id}` as any)}>
                    <Text>{title}</Text>
                    <View style={styles.points}>
                        <Text style={styles.pointText}>+50 points</Text>
                    </View>
            </Pressable>
    )
}

export default ActivityBox;