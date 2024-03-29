import React, { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Pressable,
} from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../../../context/ThemeContext";
import { colors } from "../../../theme";

export default function AppInfo() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [color, setColor] = useState(false);
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  let activeColors = colors[theme.mode];
  console.log(activeColors);

  const backgroundColor = theme.mode === "dark" ? "#111827" : "#666f80";
  const textColor = theme.mode === "dark" ? "white" : "white";
  const theme_icon = theme.mode == "dark" ? "moon" : "sun";

  const toggleTheme = () => {
    const newMode = theme.mode === "light" ? "dark" : "light";
    setTheme({ mode: newMode });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: activeColors.primary, height: "100%" }}>
        <View
          style={{
            padding: 24,
            backgroundColor: activeColors.primary,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View onPress={() => {}}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
                }}
                style={styles.profileAvatar}
              />

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 19,
                fontWeight: "600",
                color: activeColors.tertiary,
                textAlign: "center",
              }}
            >
              John Doe
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                color: activeColors.tertiary,
                textAlign: "center",
              }}
            >
              123 Maple Street. Anytown, PA 17101
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text
              style={{
                paddingVertical: 12,
                fontSize: 12,
                fontWeight: "600",
                color: activeColors.tertiary,
                textTransform: "uppercase",
                letterSpacing: 1.1,
              }}
            >
              Preferences
            </Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="globe"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Language
              </Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name={theme_icon}
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Dark Mode
              </Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={toggleTheme}
                value={theme.mode === "dark"}
              />
            </View>

            <TouchableOpacity
              onPress={() => {}}
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="navigation"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Location
              </Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color={activeColors.tertiary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>

            <View
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="at-sign"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Email Notifications
              </Text>

              <View
                style={[
                  styles.rowSpacer,
                  { backgroundColor: activeColors.secondary },
                ]}
              />

              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
              />
            </View>

            <View
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="bell"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Push Notifications
              </Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={(pushNotifications) =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text
              style={{
                paddingVertical: 12,
                fontSize: 12,
                fontWeight: "600",
                color: activeColors.tertiary,
                textTransform: "uppercase",
                letterSpacing: 1.1,
              }}
            >
              Resources
            </Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="flag"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Report Bug
              </Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="mail"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Contact Us
              </Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={[styles.row, { backgroundColor: activeColors.secondary }]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: activeColors.secondary },
                ]}
              >
                <FeatherIcon
                  color={activeColors.tertiary}
                  name="star"
                  size={20}
                />
              </View>

              <Text style={[styles.rowLabel, { color: activeColors.tertiary }]}>
                Rate in App Store
              </Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color={activeColors.tertiary}
                name="chevron-right"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    marginTop: 34,
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },

  /** Section */
  section: {
    paddingHorizontal: 24,
  },

  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
