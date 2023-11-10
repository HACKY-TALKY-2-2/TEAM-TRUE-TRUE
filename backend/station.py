import math
import random

seed = "12AK"
random.seed(seed)
jump_generate = 20
jump_path = 10

def polar_to_cartesian(r, theta):
    x = r * math.cos(theta)
    y = r * math.sin(theta)
    return x, y

def randomize_coordinate(x, y, range):
    random_radius = random.uniform(0, range)
    random_angle = random.uniform(0, 2 * math.pi)

    randomized_x = x + random_radius * math.cos(random_angle)
    randomized_y = y + random_radius * math.sin(random_angle)

    return randomized_x, randomized_y

def skew_ratio(distance):
    return (math.e ** -(distance/1000))

def find_closest_point(point, cluster, exlude_list):
    closest_point = None
    closest_distance = None
    for other_point in cluster:
        distance = ((point[0] - other_point[0]) ** 2 + (point[1] - other_point[1]) ** 2) ** 0.5
        if (not other_point in exlude_list) and (closest_distance is None or distance < closest_distance):
            closest_distance = distance
            closest_point = other_point
    return closest_point, closest_distance

width, height = 200, 100
center = (width/2, height/2)
radius = (width ** 2 + height ** 2) ** 0.5 / 2

coords = [(0, 0)]
random.seed(seed)
for ind in range(0, int(radius), jump_generate):
    count = ind // 5 + 1
    for ang in range(0, 360, 360 //count):
        tx, ty = polar_to_cartesian(ind, ang)
        x, y = randomize_coordinate(tx, ty, 20)
        coords.append((x, y))

def get_next_point(personindex, path, coords):
    path_positive = path[personindex][0]
    path_negative = path[personindex][1]
    direction = path[personindex][2]

    direction_pos = direction if len(path_positive) <= 1 else math.atan2(path_positive[-1][1] - path_positive[-2][1], path_positive[-1][0] - path_positive[-2][0])
    direction_neg = direction if len(path_negative) <= 1 else math.atan2(path_negative[-1][1] - path_negative[-2][1], path_negative[-1][0] - path_negative[-2][0])

    positive_jump = tuple(a + b for a, b in zip(path_positive[-1], (jump_path * math.cos(direction_pos), jump_path * math.sin(direction_pos))))
    negative_jump = tuple(a - b for a, b in zip(path_negative[-1], (jump_path * math.cos(direction_neg), jump_path * math.sin(direction_neg))))

    exclude_list_nested = (pa[0] + pa[1] for pa in path)
    exclude_list = [item for sublist in exclude_list_nested for item in sublist]
    pos_close_point, pos_close_distance = find_closest_point(positive_jump, coords, exclude_list)
    neg_close_point, neg_close_distance = find_closest_point(negative_jump, coords, exclude_list)
    if (pos_close_distance < neg_close_distance):
        path_positive.append(pos_close_point)
    else:
        path_negative.append(neg_close_point)
    return path_positive, path_negative

random.seed(seed)
personcnt = 2
order = [0,0,0,0,1,1,1,0,1,1,0,0,1,1,1,1]
path = [([(0, 0)], [(0, 0)], random.uniform(0, math.pi)) for i in range(personcnt)]

random.seed(seed)
for ord in order:
    pos_path, neg_path, direction = path[ord]
    path_positive, path_negative = get_next_point(ord, path, coords)
    path[ord] = (path_positive, path_negative, direction)

for p in path:
    pos_path, neg_path, _ = p
    print(list(reversed(neg_path[1:])) + pos_path)


