
## What it does

We have built a very powerful dataset customization tool. 

### Levels of granularity
It is powerful because our tool lets user customize a dataset at multiple (Three) granularities. In our case we focus on Image classification dataset (Tiny-ImageNet-C)
1. Coarse Level Customization: Not every time an ML engineer would be picky about what image to pick for training and  what to pick for testing, so at this coarser granularity our engineer can shortlist "classes", "augmentations", "augmentation severities" with a single loosely formed language prompt. Our tool uses OpenAI's GPT-3.5 to understand the prompt and propose a subset of the dataset.

2. Medium granularity customization: At this level, user has the control over each "class" and other metadata attributes. This can be used to fix any mistakes made in the coarser level, or to make very selective customizations. Control at this level helps all the needs required to publish the paper "Efficiently Modeling Long Sequences with Structured State Spaces" <https://arxiv.org/pdf/2111.00396.pdf>

3. Fine customizations: This is a granularity typically annotators/labelers deal at. But for an ML engineer this could be handy when there are certain points in the dataset causing issues in the DataLoader or if ML engineer has to create a mini dataset for fine-tuning.

### Data relation modeling
Our tool also lets ML engineer  play with the data and feel it. Particularly our screen 1's "Image Viewer" and screen 2's "Relationship Explorer" lets user explore all relations in the dataset including the metadata. Just by clicking on buttons, the user will hypothetically be able to crawl through the entire dataset. 

### Robustness to missing labels
Our tool, despite being made of simple and intuitive logic, can deal with missing data. This is very important because "missing segments" are very common on large databases due to many different reasons and this is one of the issues ML engineers stumble upon and waste their precious time.

Overall, DataDiver is a web application designed to organize, query, and visualize machine learning datasets. It allows users to customize their dataset through a series of steps, including searching, browsing, and extracting data based on specific criteria. The tool aims to provide a user-friendly interface for managing complex datasets, particularly for deep learning applications."

## How we built it
"We built it using React and Python"

## Challenges we ran into
"One of the main challenges we faced was designing an intuitive user interface that would allow users to easily navigate and interact with their dataset. This part took 1 full day before we finalized on what screens, what APIs got to be there. Rest of the implementation is not that easy as well, with atleast 10 diverse react components having to be created for this."

## Accomplishments that we're proud of
'Our tool lets user play with data at multiple granularities. The coarse level is a strong application of large language models, letting user perform operations at high level without having to spend a lot of time.  '

## What we learned
'Data customization is a hard problem, but we can atleast attempt to solve it XD'

## What's next for DataDiver
'Build a production website that can deal with many variants of Image Net datasets '
