import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const RADIUS = 45;
const STROKE_WIDTH = 10;
const CIRCLE_LENGTH = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HomeScreen() {
  const CURRENT_MONTH = "11월";
  const [todos] = useState([
    { id: 1, text: "동대구시장까지 1시간 산책하기", completed: false },
    { id: 2, text: "자기 전 30분 명상하기", completed: true },
    { id: 3, text: "AI 추천 활동 받기", completed: false },
    { id: 4, text: "스크린 타임 분석하기", completed: false },
  ]);

  // Animation values for each ring
  const urgentProgress = new Animated.Value(0);
  const routineProgress = new Animated.Value(0);
  const finishedProgress = new Animated.Value(0);

  useEffect(() => {
    // Animate all rings simultaneously
    Animated.parallel([
      Animated.timing(urgentProgress, {
        toValue: 0.75, // 75% complete
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(routineProgress, {
        toValue: 0.45, // 45% complete
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(finishedProgress, {
        toValue: 0.25, // 25% complete
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const urgentStrokeDashoffset = urgentProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_LENGTH, 0],
  });

  const routineStrokeDashoffset = routineProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_LENGTH, 0],
  });

  const finishedStrokeDashoffset = finishedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_LENGTH, 0],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>{CURRENT_MONTH}</Text>
        <View style={styles.calendar}>
          {[13, 14, 15, 16, 17, 18, 19].map((day, index) => (
            <View
              key={day}
              style={[styles.calendarDay, day === 18 && styles.selectedDay]}
            >
              <Text
                style={[styles.dayText, day === 18 && styles.selectedDayText]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.ringsContainer}>
        <Svg width={200} height={200} style={styles.svg}>
          <G rotation="-90" origin="100, 100">
            <Circle
              cx="100"
              cy="100"
              r={RADIUS}
              stroke="#f1f1f1"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
            />
            <Circle
              cx="100"
              cy="100"
              r={RADIUS + 15}
              stroke="#f1f1f1"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
            />
            <Circle
              cx="100"
              cy="100"
              r={RADIUS + 30}
              stroke="#f1f1f1"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
            />

            <AnimatedCircle
              cx="100"
              cy="100"
              r={RADIUS}
              stroke="#4CAF50"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={finishedStrokeDashoffset}
              strokeLinecap="round"
            />
            <AnimatedCircle
              cx="100"
              cy="100"
              r={RADIUS + 15}
              stroke="#FFA000"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={routineStrokeDashoffset}
              strokeLinecap="round"
            />
            <AnimatedCircle
              cx="100"
              cy="100"
              r={RADIUS + 30}
              stroke="#FF5252"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={urgentStrokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#FF5252" }]} />
            <Text>열정</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#FFA000" }]} />
            <Text>꾸준</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
            <Text>긍정</Text>
          </View>
        </View>
      </View>

      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>오늘의 할 일</Text>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                todo.completed && styles.checkboxChecked,
              ]}
            >
              {todo.completed && (
                <Ionicons name="checkmark" size={18} color="white" />
              )}
            </TouchableOpacity>
            <Text
              style={[
                styles.todoText,
                todo.completed && styles.todoTextCompleted,
              ]}
            >
              {todo.text}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  calendarDay: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#4CAF50",
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: "#fff",
  },
  ringsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  svg: {
    transform: [{ rotateZ: "90deg" }],
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  todoContainer: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CCC",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  todoText: {
    fontSize: 16,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  aiButton: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  aiButtonText: {
    color: "#4CAF50",
  },
  screenButton: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  screenButtonText: {
    color: "#fff",
  },
});
