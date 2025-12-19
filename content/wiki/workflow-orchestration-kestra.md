+++
date = '2025-11-04T12:19:57Z'
title = 'Workflow Orchestration in Kestra'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp"]
+++

Kestra is an open-source, event-driven orchestration platform that simplifies building both scheduled and event-driven workflows. By adopting Infrastructure as Code practices for data and process orchestration, Kestra enables you to build reliable workflows with just a few lines of YAML.

Orchestration is like a musical orchestra: you have different instruments that make different sounds that need to play at different times and different orders. An orchestra is successful only if it has a conductor, someone that can stand in the middle and make sure that all of these instruments know exactly when they need to come in and at what point.

This is the same with pipelines and scripts: we have many different scripts that do different things to achieve a final result, but running them independently is only a small part of the job; the main part is to get them to work together and make sure they can rely on one another.

Kestra is an all in one orchestration platform that allows you to perform:

- ETL/ELT
- API Orchestration
- Scheduled & Event driven Workflows
- Batch Data Pipelines
- Interactive Conditional Inputs

Kestra can be no-code, low-code or full-code.

Kestra allows you to write in any language you want. It separates the orchestration logic from the code logic.

# Flow

[Flow](https://kestra.io/docs/workflow-components/flow) is a container for tasks and their orchestration logic.

A Flow is the fundamental unit of orchestration in Kestra. It defines a set of tasks, their execution order, inputs, outputs, and orchestration logic.

A flow organizes tasks, their inputs and outputs, error handling, and orchestration logic. It specifies what tasks run, when they run, and how they interact (sequentially, in parallel, or conditionally).

You can define a flow declaratively using a YAML file. Alternatively, you can also build flows using the No-Code Editor instead of writing your own YAML.

A flow must have:

- identifier (id)
- namespace
- list of tasks

Optionally, a flow can also have:

- inputs
- outputs
- variables
- triggers
- labels
- pluginDefaults
- errors
- finally
- retries
- sla
- concurrency
- descriptions
- disabled
- revision

Example:

```yaml
id: hello-world
namespace: company.team

description: flow **documentation** in *Markdown*

labels:
  env: prod
  team: engineering

inputs:
  - id: my-value
    type: STRING
    required: false
    defaults: "default value"
    description: This input is optional.

variables:
  first: "1"
  second: "{{vars.first}} > 2"

tasks:
  - id: date
    type: io.kestra.plugin.core.debug.Return
    description: "Some tasks **documentation** in *Markdown*"
    format: "A log line content with a contextual date variable {{taskrun.startDate}}"

pluginDefaults:
  - type: io.kestra.plugin.core.log.Log
    values:
      level: ERROR
```

## Plugin defaults

Use pluginDefaults to avoid repeating common configurations across multiple tasks of the same type. This is a list of default task properties that will be applied to each task of a certain type inside your flow.

## Variables

Flow-level variables define key/value pairs that tasks can access using {{ vars.key }}.

## List of tasks

The most important part of a flow is the list of tasks that will be run sequentially when the flow is executed.

## Namespaces

Namespaces are used to group flows and provide structure. Keep in mind that a flow’s allocation to a namespace is immutable. Once a flow is created, you cannot change its namespace. If you need to change the namespace of a flow, create a new flow within the desired namespace and delete the old flow.

## Labels

To add another layer of organization, use labels to group flows with key–value pairs. In short, labels are customizable tags to simplify monitoring and filtering of flows and executions.

## Description(s)

You can optionally add a description property to document your flow's purpose or other useful information. The description is a string that supports markdown syntax. This markdown description is rendered and displayed in the UI.

## Task

A task is a single action in a flow. A task can have properties, use flow inputs and other task's outputs, perform an action, and produce an output.

Tasks are defined as a list. By default, all tasks in the list will be executed sequentially — the second task will start as soon as the first one finishes successfully.

Kestra provides additional customization to run tasks in parallel, iterate (sequentially or in parallel) over a list of items, or allow specific tasks to fail without stopping the flow. These kinds of actions are called Flowable tasks because they define the flow logic.

A task in Kestra must have an id and a type. Other properties depend on the task type. You can think of a task as a step in a flow that should execute a specific action, such as running a Python or Node.js script in a Docker container or loading data from a database.

There are two kinds of tasks in Kestra:

- Runnable Tasks – Perform actual work (API calls, database queries, computations). Executed by workers.
- Flowable Tasks – Control orchestration (branching, looping, parallelization). Executed by the executor, not suitable for heavy computation.

### Runnable Task

Runnable Tasks handle computational work in the flow. For example, these include file system operations, API calls, database queries, etc. These tasks can be compute-intensive and are handled by workers.

By default, Kestra only includes a few Runnable Tasks. However, many of them are available as plugins, and if you use our default Docker image, plenty of them are already included.

### Flowable Task

Flowable Tasks only handle flow logic (branching, grouping, parallel processing, etc.) and start new tasks. For example, the Switch task decides the next task to run based on some inputs.

A Flowable Task is handled by an executor and can be called very often. Because of that, these tasks cannot include intensive computations, unlike Runnable Tasks. Most of the common Flowable Tasks are available in the default Kestra installation.

## Labels

Labels are key-value pairs that you can add to flows. Labels are used to organize flows and can be used to filter executions of any given flow from the UI.

## Inputs

Inputs are strongly typed parameters provided at execution time. Can be required or optional, with default values and validation rules.

Inputs of type FILE are uploaded to Kestra's internal storage and made available for all tasks.

Flow inputs can be seen in the Overview tab of the Execution page.

Similar to tasks, inputs is defined as a list of key–value pairs. Each input must have an id and a type. You can also set defaults for each input. Setting default values for an input is always recommended, especially if you want to run your flow on a schedule.

To retrieve an input value, you need to identify the input in an expression. In Kestra, bracket notation {{ }} is used to wrap an expression. For an input, follow this general {{ inputs.input_id }} syntax. In the example below, the input id is set to user, and it's referenced in the task message as `{{ inputs.user }}`:

```yml
id: inputs_demo
namespace: company.team

inputs:
  - id: user
    type: STRING
    defaults: Rick Astley

tasks:
  - id: hello
    type: io.kestra.plugin.core.log.Log
    message: Hey there, {{ inputs.user }}
```

## Outputs

Outputs are results produced by tasks or flows. Outputs can be reused in later tasks or downloaded if stored in internal storage.

Some outputs are of a special type and are stored in Kestra's internal storage. Kestra automatically makes these outputs available for all tasks.

You can view:

- task outputs in the Outputs tab of the Execution page
- flow outputs in the Overview tab of the Execution page

If an output is a file from the internal storage, it will be available to download.


Outputs let you pass data between tasks and flows.

Tasks and flows can generate outputs that are passed to downstream processes. These outputs can be variables or files stored in the internal storage.

Similar to inputs, use expressions to access outputs in downstream tasks. Use the syntax `{{ outputs.task_id.output_property }}` to retrieve a specific output value of a task.

If your task id contains one or more hyphens (-), wrap the task id in square brackets, for example: `{{ outputs['task-id'].output_property }}`.

To see which outputs have been generated during a flow execution, go to the Outputs tab on the Execution page

## Revision

Every change to a flow creates a new revision. Kestra automatically manages revisions, similar to version control, and you can view them in the Revisions tab.

You can access old revisions inside the Revisions tab of the Flows page.

## Triggers

Triggers are a way to start a flow from external events. For example, a trigger might initiate a flow at a scheduled time or based on external events (webhooks, file creation, message in a broker, etc.).

## Flow variable expressions

Flows have a number of variable expressions giving you information about them dynamically, a few examples include:

| Parameter            | Description                             |
|----------------------|-----------------------------------------|
| {{ flow.id }}        | The identifier of the flow.             |
| {{ flow.namespace }} | The name of the flow namespace.         |
| {{ flow.tenantId }}  | The identifier of the tenant (EE only). |
| {{ flow.revision }}  | The revision of the flow.               |
